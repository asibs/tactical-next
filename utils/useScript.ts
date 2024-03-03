import { useEffect, RefObject } from "react"

{/* This hook is necessary to inject a script into a React/Next page everytime the page
  * loads. Without it, a script is only loaded the first time the page loads. Subsequent
  * navigations to the page via <Link> attributes don't re-load the script after the page
  * has rendered - meaning scripts which depend on running after page-load don't work.
  * 
  * See here: https://github.com/vercel/next.js/issues/4477#issue-326727494
  * 
  * For example, this affects the ActionNetwork script, because it replaces the content
  * of a named div, so needs to re-run after the page is fully rendered.
  */}
export const useScript = (
  url: string,
  onload: () => void,
  ref: RefObject<HTMLDivElement>
) => {
  useEffect(() => {
    const script = document.createElement('script')

    script.src = url
    script.defer = true
    script.onload = onload

    if (ref.current) {
      ref.current.appendChild(script)
    }

    return () => {
      ref.current?.removeChild(script)
    };
  }, [url, ref])
}