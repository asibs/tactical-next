## Setup

### Basic Local Setup & Installation

1. Ensure you have node 18 instaled ([nvm](https://github.com/nvm-sh/nvm#intro) is recommended for installing & managing multiple node versions)
2. Clone this repo: `git clone git@github.com:asibs/tactical-next.git`
3. Switch into project folder: `cd tactical-next`
4. Install the dependencies: `npm install`
5. Run the app: `npm dev`
6. The app should be available at: https://localhost:3000/

### Production Deployment

**Production Build (main branch)**

We deploy the app to [Vercel](https://vercel.com/). Vercel will auto-deploy each commit to the `main` branch into Production.
The ENV VARs for Production need to be set appropriately - see the `.env.example` to see the different ENV VARs and descriptions
of how to set them. In particular, for Prod, you want `ENABLE_STORYBLOK_LIVE_EDITING` set to `false` in order to statically
generate the site and avoid any runtime dependency on Storyblok.

[Storyblok](https://www.storyblok.com/) is used to generate the app content. Whenever changes are published to Storyblok, files
containing all the Storyblok content are added or updated in the GitHub repository for this project. The production build of the
site simply reads the Storyblok content from these files, meaning the site can be statically rendered and there is no runtime
dependency on the Storyblok website or APIs. This means we can _effectively_ use Storyblok for free, _and_ we don't have to worry
about Storyblok downtime affecting our live website. _Note, the production runtime app does still depend on Storyblok node modules_.

**Storyblok Build (storyblok branch)**

The `sync-storyblok-branch.yaml` GitHub Action (stored in `.github/workflows`) runs every time any code is merged to `main`, and
pushes this code into the `storyblok` branch. This branch exists purely to give us a "staging" environment for Storyblok
live-editing. This branch is auto-deployed to Vercel through their standard build-per-commit setup. However, we configure the
`storyblok` branch with different ENV VARs from Prod - in particular, we set `ENABLE_STORYBLOK_LIVE_EDITING` to `true`.

This build of the app can be hooked up to Storyblok, enabling Storyblok admin users to edit the website content directly in the
Storyblok UI and see real-time updates. This needs to be setup in the Storyblok UI by pointing Storyblok at the URL for the
Vercel storyblok build. In order to have a fixed URL for the storyblok branch across multiple Vercel builds, you need a custom
domain. Once this is all setup, you should be able to live-edit the website content through the Storyblok UI.

**Pushing Storyblok changes to Prod**

Any updates made through the Storyblok UI won't be reflected on Prod. In order to get these changes into Prod, they need to be
checked into files in the `main` branch. This can be achieved automatically by a combination of webhooks and GitHub Actions.

There is an API endpoit at `app/api/githooks/storyblok/route.ts`. When called, this endpoint will trigger the GitHub Action at
`.github/workflows/storyblok-published.yaml`, which will generate a new PR with all the changes to Storyblok content against the
GitHub repo.

In theory, you could call this endpoint on Prod, but it's preferable to call it on the Storyblok build, if only to avoid
unnecessary API calls on Prod.

1. Set the `STORYBLOK_TO_GHA_KEY` for your Vercel Storyblok build to a secure, randomly generated string.
2. Create a webhook in the Storyblok UI which will trigger whenever a Story is published, unpublished, deleted or moved. It
   should point to the API endpoint mentioned above, with a URI param called `apiKey` set to the random key from (1)- ie.
   `https://MY_APP_STORYBLOK_BRANCH/api/githooks/storyblok?apiKey=MY_RANDOM_KEY`
3. Generate a GitHub Personal Access Token (User Settings -> Developer Settings -> Personal Access Tokens). A fine-grained
   token is recommended, as this allows you to limit the access more. You will need to grant access to this repo only, with
   "Read access to metadata" and "Read and Write access to code". Once generated, copy the token.
4. Set the ENV VARs in the Storyblok build (through the Vercel UI). You need to set `GHA_TOKEN` (the token you generated &
   copied in the step above), `GH_OWNER` (your GitHub username), and `GH_REPO` (the URL to the GitHub repo).

Now you should be able to publish changes to the site content in the Storyblok UI, and this should auto-generate a Pull
Request in GitHub! A link to the Vercel Preview deployment for the branch should also be automatically added as a comment
on the PR within a few minutes of the PR being created. Once you've confirmed the Vercel Preview build is good, you can
merge the PR to main, and the changes will auto-deploy to Production.

### Development

During development, you are likely to want to add new types of Storyblok blocks (eg. you might create a ButtonLink block
or a PostcodeLookup block, etc). If & when you add these, you can automatically pull Typescript definitions for them by
running scripts.

1. Set the `STORYBLOK_SPACE_ID` in your `.env.local` to your Storyblok Space ID (you can find this in the Storyblok UI)
2. Login to the Storyblok CLI: `npm run storyblok:login`
3. `npm run storyblok:pull_components`
4. `npm run storyblok:generate_types`

Note, if you have auth issues at step 3, you may need to force logout and login again (`npm run storyblok:logout` then `npm run storyblok:login`).

This will create / update `components.storyblok.json` (step 2) and `/components/storyblok-types.d.ts` (step 3). These types
can then be used when creating your React Components for the Storyblok blocks.

---

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
