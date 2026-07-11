import z from "zod";
import {
  BasicInfoBlocks,
  BasicInfoBlocksSchema,
  CareerBlocks,
  CareerBlocksSchema,
} from "../model/blocks.add.model";

declare global {
  type CAREER_BLOCKS_FORM_ITEM = z.infer<typeof CareerBlocksSchema>;

  type BASIC_INFO_BLOCKS_FORM_ITEM = z.infer<typeof BasicInfoBlocksSchema>;

  type API_BLOCKS_ADD_PARAM =
    | CAREER_BLOCKS_FORM_ITEM
    | BASIC_INFO_BLOCKS_FORM_ITEM;

  type API_SERVER_BLOCKS_ADD = RESPONSE_MODEL<
    ({ id: number } & BASIC_INFO_BLOCK_ITEM) | CAREER_BLOCK_ITEM
  >;

  type API_CLIENT_BLOCKS_ADD = boolean;
}

export {};
