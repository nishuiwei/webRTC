import { setDirectChatHistory } from "../store/actions";
import store from "../store/store";

export const appendNewMessageToChatHistory = (data) => {
  const { isAuthor, authorSocketId, receiverSocketId } = data
  console.log(isAuthor)
  // 根据 isAhuor 的值判断历史记录应该存储在那个用户 （接收方 / 发送方） 的历史记录里面
  if (isAuthor) {
    // 作为发送方去存储历史记录
    appendMessageToChatHistory(receiverSocketId, data);
  } else {
    // 作为接收方去存储历史记录
    appendMessageToChatHistory(authorSocketId, data);
  }
}

const appendMessageToChatHistory = (userSocketId, data) => {
  // 找到存储在 store 中的历史记录 --> directChatHistory: []
  const chatHistory = [...store.getState().directChatHistory]
  // 找到其中的某个用户的历史记录 --> userSocketId
  const userChatHistory = chatHistory.find(history => history.socketId === userSocketId)
  console.log(userChatHistory)
  // 验证 userChatHistory 是否存在
  if (userChatHistory) {
    // 如果存在历史记录，就将新获取的信息添加进去
    // 创建获取的新会话
    const newDirectMessage = {
      isAuthor: data.isAuthor,
      messageContent: data.messageContent,
      identity: data.identity
    }
    // 创建新的用户历史记录
    const newUserChatHistory = {
      ...userChatHistory,
      chatHistory: [
        ...userChatHistory.chatHistory,
        newDirectMessage
      ]
    }
    console.log(newUserChatHistory)
    // 替换掉上一次的历史记录
    const newChatHistory = [...chatHistory.filter(history => history.socketId !== userSocketId), newUserChatHistory]
    // 同步更新到 store 中
    console.log(newChatHistory)
    store.dispatch(setDirectChatHistory(newChatHistory))
  } else {
    // 如果历史记录不存在，就重新创建该用户的历史记录
    const newUserChatHistory = {
      socketId: userSocketId,
      chatHistory: [
        {
          isAuthor: data.isAuthor,
          messageContent: data.messageContent,
          identity: data.identity
        }
      ]
    }
    const newChatHistory = [...chatHistory, newUserChatHistory]
    // 同步更新到 store 中
    console.log(newChatHistory)
    store.dispatch(setDirectChatHistory(newChatHistory))
  }
}