import { Octokit } from "@octokit/core";
import Crypto from "crypto";

/**
 * Proxy API route to trigger the Storyblok Published Github Action (defined in .github/workflows/storyblok-published.yaml)
 * 
 * This is necessary because triggering Github Actions requires specific auth, but Storyblok webhooks can only be simple
 * GET requests (albeit we can add URL params).
 * 
 * This API route requires an apiKey URL param, and if it matches the expected API key in ENV (which should be a secure,
 * randomly generated string), then it makes a request to Github via their API to trigger the storyblok-published event and
 * trigger the Github Action.
 */
export async function GET(request: Request) {
  // Validate 
  const { searchParams } = new URL(request.url)
  const sentKey = searchParams.get('apiKey') || ''
  const correctKey = process.env.STORYBLOK_TO_GHA_KEY || ''
  if (sentKey === '' || !Crypto.timingSafeEqual(Buffer.from(sentKey), Buffer.from(correctKey))) {
    console.log('Storyblok githook: API Key did not match - returning 404')
    return new Response('Not found', { status: 404 })
  }

  // Trigger Github Action
  console.log('Storyblok githook: API Keys matched - returning 200')

  const ghaToken = process.env.GHA_TOKEN
  const ghOwner = process.env.GH_OWNER
  const ghRepo = process.env.GH_REPO

  const octokit = new Octokit({ auth: ghaToken })

  await octokit.request(`POST /repos/${ghOwner}/${ghRepo}/dispatches`, {
    owner: ghOwner,
    repo: ghRepo,
    event_type: 'storyblok-published',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })

  return new Response('OK', { status: 200 })
}