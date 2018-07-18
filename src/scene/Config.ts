
interface Config {
  showHelpers: false;
  shadowMapSize: {
    width: number;
    height: number;
  };
  penumbra: number;
  dimensions: {
    card: number;
  }
}

const DefaultConfig: Config = {
  showHelpers: false,
  shadowMapSize: {
    width: 1024,
    height: 1024
  },
  penumbra: 0.75,

  dimensions: {
    card: 0.2
  }
};

export default DefaultConfig;
