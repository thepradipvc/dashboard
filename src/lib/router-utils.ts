// To use nextjs router instance outside react components

import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from 'nextjs-toploader/app';

let routerInstance: ReturnType<typeof useRouter> | null = null;

export function setRouterInstance(router: ReturnType<typeof useRouter>) {
  routerInstance = router;
}

export function getRouterInstance() {
  if (!routerInstance) {
    throw new Error(
      "Router instance not set. Make sure to call setRouterInstance in a React component."
    );
  }
  return routerInstance;
}

export function navigate(href: string, options?: NavigateOptions) {
  const router = getRouterInstance();
  router.push(href, options);
}
