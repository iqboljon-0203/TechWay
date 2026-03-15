// =============================================================================
// Global Loading Boundary
// Displays a polished skeleton UI while the page content is resolving.
// Incorporates a premium aesthetic matching the site's sleek design.
// =============================================================================

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8 space-y-16 animate-pulse">
      {/* Hero Skeleton Component */}
      <div className="flex flex-col items-center justify-center space-y-8 text-center mt-10">
        <div className="h-6 w-32 rounded-full bg-muted"></div>
        <div className="h-16 w-3/4 md:w-1/2 rounded-md bg-muted"></div>
        <div className="h-6 w-2/3 md:w-1/3 rounded-md bg-muted"></div>
        <div className="flex gap-4">
          <div className="h-12 w-36 rounded-md bg-muted"></div>
          <div className="h-12 w-36 rounded-md bg-muted"></div>
        </div>
      </div>

      {/* Bento Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16">
        <div className="h-72 rounded-3xl bg-muted md:col-span-2 md:row-span-2"></div>
        <div className="h-72 rounded-3xl bg-muted"></div>
        <div className="h-72 rounded-3xl bg-muted"></div>
        <div className="h-72 rounded-3xl bg-muted md:col-span-3"></div>
      </div>
    </div>
  );
}
