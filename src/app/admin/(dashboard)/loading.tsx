export default function AdminLoading() {
    return (
        <div className="w-full space-y-6 animate-pulse">
            {/* Header Skeleton */}
            <div className="flex justify-between items-center pb-4">
                <div className="space-y-2">
                    <div className="h-8 w-48 bg-slate-200 rounded-xl"></div>
                    <div className="h-4 w-72 bg-slate-100 rounded-lg"></div>
                </div>
                <div className="h-10 w-32 bg-slate-200 rounded-xl hidden sm:block"></div>
            </div>

            {/* Grid Stats Skeleton */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm h-24 flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-xl flex-shrink-0"></div>
                        <div className="space-y-2 flex-grow">
                            <div className="h-3 w-12 bg-slate-100 rounded"></div>
                            <div className="h-6 w-20 bg-slate-200 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Content Box Skeleton */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
                <div className="h-6 w-36 bg-slate-200 rounded-lg"></div>
                <div className="space-y-3">
                    <div className="h-4 w-full bg-slate-100 rounded-lg"></div>
                    <div className="h-4 w-5/6 bg-slate-100 rounded-lg"></div>
                    <div className="h-4 w-4/6 bg-slate-100 rounded-lg"></div>
                </div>
            </div>
        </div>
    );
}
