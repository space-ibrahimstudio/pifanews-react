const areaConfig = () => {
  const subDomain = process.env.REACT_APP_DOMAIN_AREA;
  const subName = process.env.REACT_APP_DOMAIN_AREA_NAME;
  const subID = process.env.REACT_APP_DOMAIN_AREA_ID;

  return { subDomain, subName, subID };
};

export default areaConfig;
