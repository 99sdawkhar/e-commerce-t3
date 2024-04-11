import { withAuth } from "@/hoc/withAuth";

const Home = () => {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center">
        Home
      </main>
    </>
  );
};

export default withAuth(Home);
