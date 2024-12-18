import { Loader } from "@mantine/core";

import { useLoaderStore } from "../store/loaderState";

export const LoaderComponent = () => {
  const loading = useLoaderStore((state) => state.getLoading());
  return loading ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
{/*       <Loader color="#7f8496" /> */}
      <Loader color="green" size="sm" type="bars" />
    </div>
  ) : null;
};
