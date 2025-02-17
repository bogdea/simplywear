const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 py-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
};

export default Container;
