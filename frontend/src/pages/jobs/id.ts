export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:1337/api/jobs?populate=*");
  const { data: jobs } = await res.json();

  const paths = jobs.map((job: any) => {
    return {
      params: {
        id: job.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ id }: any) => {
  const res = await fetch(`http://localhost:1337/api/jobs/${id}?populate=*`);
  const { data: job } = await res.json();

  return {
    props: { job },
    revalidate: 1,
  };
};
