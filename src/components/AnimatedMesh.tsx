export const AnimatedMesh = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="blob w-96 h-96 bg-blue-500/20 dark:bg-blue-500/25 top-[-10%] left-[-10%] animate-float1" />
      <div className="blob w-96 h-96 bg-purple-500/20 dark:bg-purple-500/25 top-[-10%] right-[-10%] animate-float2" />
      <div className="blob w-96 h-96 bg-teal-500/20 dark:bg-teal-500/25 bottom-[-10%] left-[30%] animate-float3" />
    </div>
  );
};
