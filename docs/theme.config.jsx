const config = {
  logo: <span>DataGrab</span>,
  docsRepositoryBase: 'https://github.com/fveracoechea/xshield/tree/main/docs',
  project: {
    link: 'https://github.com/fveracoechea/xshield',
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – DataGrab',
    };
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="DataGrab" />
      <meta
        property="og:description"
        content="Convenience methods for performing HTTP request"
      />
    </>
  ),
};

export default config;
