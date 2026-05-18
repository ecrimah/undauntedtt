export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col h-full animate-pulse">
      {/* Image Skeleton */}
      <div className="relative aspect-[3/4] bg-brand-taupe/30 rounded-lg sm:rounded-xl mb-2 sm:mb-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-taupe/30 via-brand-cream to-brand-taupe/30 animate-shimmer" style={{ backgroundSize: '200% 100%' }}></div>
      </div>

      {/* Content Skeleton */}
      <div className="flex flex-col flex-grow space-y-2 sm:space-y-3 px-0.5 sm:px-0">
        {/* Title */}
        <div className="space-y-1 sm:space-y-1.5">
          <div className="h-3 sm:h-4 bg-brand-taupe/30 rounded w-3/4"></div>
          <div className="h-3 sm:h-4 bg-brand-taupe/30 rounded w-1/2"></div>
        </div>

        {/* Color Swatches */}
        <div className="flex gap-1 sm:gap-1.5">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-brand-taupe/30"></div>
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-brand-taupe/30"></div>
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-brand-taupe/30"></div>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1.5 sm:gap-2">
          <div className="h-4 sm:h-5 bg-brand-taupe/30 rounded w-16 sm:w-20"></div>
          <div className="h-3 sm:h-4 bg-brand-taupe/20 rounded w-10 sm:w-12"></div>
        </div>

        {/* Button (Mobile) */}
        <div className="mt-auto pt-1.5 sm:pt-2 lg:hidden">
          <div className="h-8 sm:h-10 bg-brand-taupe/20 rounded-lg w-full"></div>
        </div>
      </div>
    </div>
  );
}
