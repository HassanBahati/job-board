import Link from "next/link";
import { getStaticPaths, getStaticProps } from "./id";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DetailedJobs = () => {
  const Max_DATE_LENGHT = 10;
  const Max_TIME_LENGHT = 11;
  const router = useRouter();
  const [job, setJob] = useState<any>({});
  const [id, setId] = useState<any>(router.query.id);

  async function FetchData() {
    const res = await fetch(`http://localhost:1337/api/jobs/${id}?populate=*`);
    const { data: job }: any = await res.json();
    setJob(job);
  }

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <>
      {/* {JSON.stringify(job, null, 2)} */}
      <article className="px-4 py-5 mx-auto max-w-7xl">
        <div className="w-full mx-auto mb-12 text-left md:w-3/4 lg:w-1/2">
          <p className="mt-6 mb-2 text-xs font-semibold tracking-wider uppercase text-primary">
            {job?.attributes?.categories?.data[0]?.attributes?.name + " LEVEL"}
          </p>
          <h1 className="mb-3 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
            {job?.attributes?.vacancy}
          </h1>
          <div className="flex mb-6 space-x-2 text-sm">
            <a
              className="p-1 bg-indigo-500 rounded-full text-gray-50 badge hover:bg-gray-200"
              href="#"
            >
              CSS
            </a>
            <a
              className="p-1 bg-indigo-500 rounded-full text-gray-50 badge hover:bg-gray-200"
              href="#"
            >
              Tailwind
            </a>
            <a
              className="p-1 bg-indigo-500 rounded-full text-gray-50 badge hover:bg-gray-200"
              href="#"
            >
              AlpineJS
            </a>
          </div>
          <a className="flex items-center text-gray-700" href="#">
            <div className="avatar">
              <img
                className="flex-shrink-0 object-cover object-center w-24 h-24 rounded-full"
                src={`http://localhost:1337${job?.attributes?.image?.data?.attributes?.url}`}
                alt={"Photo of " + job?.attributes?.recruiter}
              />
            </div>
            <div className="ml-4">
              <p className="font-semibold text-gray-800 text-md">
                {job?.attributes?.recruiter}
              </p>
              <p className="text-sm text-gray-500">
                {job?.attributes?.publishedAt?.substring(0, Max_DATE_LENGHT)}
              </p>
              <p className="text-sm text-gray-500">
                {job?.attributes?.createdAt?.substring(16, Max_TIME_LENGHT)}
              </p>
            </div>
          </a>
        </div>

        <div className="w-full mx-auto prose md:w-3/4 lg:w-1/2">
          <p>{job?.attributes?.description}</p>
        </div>

        <div className="flex flex-col items-center justify-center mt-10 space-x-0 space-y-2 md:space-x-2 md:space-y-0 md:flex-row">
          <Link href="/jobs" legacyBehavior>
            <a
              href=""
              className="px-3 py-2 text-indigo-500 border border-indigo-500 border-solid hover:text-black md:w-auto"
            >
              Back
            </a>
          </Link>
        </div>
      </article>
    </>
  );
};

export default DetailedJobs;
