import Dexie from "dexie";

// list of DB names
const CREATIVE_STORE_CHAT_DB_NAME =
  process.env.REACT_APP_CREATIVE_STORE_CHAT_DB;

// list of DBs
export const creativeStoreDb = new Dexie(
  CREATIVE_STORE_CHAT_DB_NAME
);

// creative store DB tables
creativeStoreDb.version(1).stores({
  creative_store_chats:
    "++id, channelId, roomId, chatContent, imageURI, isChat, isImage, senderId, senderFullName, senderProfilePictureUri, createdAt, updatedAt, deletedAt",
});
