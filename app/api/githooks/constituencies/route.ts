import { Octokit } from "@octokit/core";
import Crypto from "crypto";

// Force next.js not to cache API calls in this route.
// The only API call in this route is the call to Github Actions, we don't want to cache this!
export const revalidate = 0;

/**
 * Proxy API route to trigger the Update Googlesheet Data Github Action
 * (defined in .github/workflows/update-googlesheet-data.yaml)
 *
 * This is necessary because triggering Github Actions requires specific auth, but we
 * want to be able to trigger on simple GET requests from the browser.
 * 
 * This API route requires an apiKey URL param, and if it matches the expected API key
 * in ENV (which should be a secure, randomly generated string), then it makes a request
 * to Github via their API to trigger the storyblok-published event and trigger the
 * Github Action.
 */
export async function GET(request: Request) {
  return await handleRequest(request);
}

export async function POST(request: Request) {
  return await handleRequest(request);
}

const handleRequest = async (request: Request) => {
  // Validate
  const { searchParams } = new URL(request.url);
  const sentKey = searchParams.get("apiKey") || "";
  const correctKey = process.env.CONSTITUENCIES_TO_GHA_KEY || "";
  if (
    sentKey === "" ||
    Buffer.byteLength(sentKey) !== Buffer.byteLength(correctKey) ||
    !Crypto.timingSafeEqual(Buffer.from(sentKey), Buffer.from(correctKey))
  ) {
    console.log("Constituencies githook: API Key did not match - returning 404");
    return new Response("Not found", { status: 404 });
  }

  // Trigger Github Action
  console.log(
    "Storyblok githook: API Keys matched - calling Github Actions API",
  );

  const ghaToken = process.env.GHA_TOKEN || "";
  const ghOwner = process.env.GH_OWNER || "";
  const ghRepo = process.env.GH_REPO || "";

  const octokit = new Octokit({ auth: ghaToken });

  const ghResponse = await octokit.request(
    `POST /repos/{owner}/{repo}/dispatches`,
    {
      owner: ghOwner,
      repo: ghRepo,
      event_type: "update-googlesheet-data",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );

  if (200 <= ghResponse.status && ghResponse.status <= 299) {
    return new Response(
      `Success - GitHub Action status: ${ghResponse.status}`,
      { status: 200 },
    );
  } else {
    return new Response(
      `Failure - GitHub Action status: ${ghResponse.status}`,
      { status: 500 },
    );
  }
};
