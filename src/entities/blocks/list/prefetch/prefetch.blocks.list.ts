// import type { QueryClient } from "@tanstack/react-query";
// import { API_SERVER_BLOCKS_LIST } from "../api/api.server.blocks.list";

// export function PrefetchBlocksList(
//   queryServer: QueryClient,
//   type?: BLOCK_TYPE
// ) {
//   await queryServer.prefetchInfiniteQuery({
//       queryKey : ["blocks","list",type??""],
//       queryFn : () => API_SERVER_BLOCKS_LIST(type),
//   })
// }
