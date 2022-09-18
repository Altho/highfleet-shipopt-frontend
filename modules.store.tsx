import create from 'zustand';

export const useBearStore = create((set) => ({
  modules: {},
  fetch: async () => {
    const response = await fetch('https://eo2qdk3mdwiezc2mj46p2oilxq0gfpwr.lambda-url.us-east-1.on.aws/data');
    set({ modules: await response.modules.json() });
  },
}));
