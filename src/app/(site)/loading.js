export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh] px-6">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 rounded-full border-2 border-[#34D399] border-t-transparent animate-spin" />
        <p className="text-xs text-slate-500">Loading...</p>
      </div>
    </div>
  );
}
