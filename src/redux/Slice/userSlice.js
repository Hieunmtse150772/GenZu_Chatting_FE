import { createSlice } from '@reduxjs/toolkit'
import Fuse from 'fuse.js'
import userIcon from '../../assets/user_icon.jpg'
const initialState = {
  lsFriends: [],
  lsSearchFriends: [],
  lsPersonalChats: [],
  lsGroupChats: [],
  lsConversation: null,
  editUser: false,
  idConversation: null,
  conversation: null,
  toastMessage: '',
  friendRequestNotification: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state) => {
      return { ...state }
    },
    searchFriends: (state, action) => {
      const lsAllFriends = JSON.parse(JSON.stringify(state.lsFriends))
      const fuse = new Fuse(lsAllFriends, {
        keys: ['info.fullName', 'info.email'],
        threshold: 0.5, // Ngưỡng tìm kiếm mờ
      })
      const result = fuse.search(action.payload)

      return {
        ...state,
        lsSearchFriends: result.map((res) => res.item),
      }
    },
    clearSearchFriends: (state, action) => {
      return {
        ...state,
        lsSearchFriends: [],
      }
    },
    setFriends: (state, action) => {
      return {
        ...state,
        lsFriends: action.payload,
      }
    },
    setNewLsFriends: (state, action) => {
      return {
        ...state,
        lsFriends: [...state.lsFriends, action.payload],
      }
    },
    getFriends: (state, action) => {},
    updateUser: (state, action) => {
      return {
        ...state,
        editUser: action.payload,
      }
    },
    setIdConversation: (state, action) => {
      return {
        ...state,
        idConversation: action.payload,
      }
    },
    createGroupChat: (state, action) => {},
    deleteGroupChat: (state, action) => {},
    getIdConversation: (state, action) => {},
    getLsConversation: (state, action) => {},
    setLsConversation: (state, action) => {
      return {
        ...state,
        lsConversation: action.payload,
      }
    },
    setNewLsConversation: (state, action) => {
      if (action.payload.isGroupChat) {
        return {
          ...state,
          lsConversation: [action.payload, ...state.lsConversation],
          lsGroupChats: [action.payload, ...state.lsGroupChats],
        }
      } else {
        return {
          ...state,
          lsConversation: [action.payload, ...state.lsConversation],
          lsPersonalChats: [action.payload, ...state.lsPersonalChats],
        }
      }
    },
    updateConversation: (state, action) => {
      console.log(action.payload)
      const index = state.lsConversation.findIndex(
        (item) => item._id == action.payload.conversation._id,
      )
      console.log(index)
    },
    updateConversationByGroupId: (state, action) => {
      console.log(action.payload)
      const { groupId, updatedConversation } = action.payload
      const conversationIndex = state.lsGroupChats.findIndex(
        (conversation) => conversation._id === groupId,
      )

      if (conversationIndex !== -1) {
        state.lsGroupChats[conversationIndex] = {
          ...state.lsGroupChats[conversationIndex],
          users: updatedConversation,
        }
      } else {
        console.error('Conversation not found')
      }
    },
    setLsGroupChat: (state, action) => {
      return {
        ...state,
        lsGroupChats: action.payload,
      }
    },
    updateGroupMembers: (state, action) => {
      const { idConversation, users } = action.payload
      console.log('idConversation', idConversation)
      const groupChatIndex = state.lsGroupChats.findIndex((group) => group._id === idConversation)
      console.log('groupIndex', groupChatIndex)

      if (groupChatIndex !== -1) {
        state.lsGroupChats[groupChatIndex].users = users
      }
    },
    deleteMemberFromGroupInStore: (state, action) => {
      const { idUser, idConversation } = action.payload
      console.log(idUser)
      console.log(idConversation)
      // Tìm group tương ứng với idConversation
      const group = state.lsGroupChats.find((group) => group._id === idConversation)
      console.log('trigger', group)
      if (group) {
        // Loại bỏ idUser khỏi danh sách members của group nếu có
        group.users = group.users.filter((userId) => userId !== idUser)
      } else {
        // Nếu không tìm thấy group, có thể xử lý lỗi hoặc thêm group mới
        console.error('Group not found')
      }
    },
    deleteGroupById: (state, action) => {
      state.lsGroupChats = state.lsGroupChats.filter(
        (groupChat) => groupChat._id !== action.payload,
      )
    },
    addNewMemberToGroup: (state, action) => {
      const { groupId, users } = action.payload
      // Tìm group tương ứng với idConversation
      const group = state.lsGroupChats.find((group) => group._id === groupId)
      // if (group) {
      //   // Thêm idUser vào danh sách members của group nếu chưa có
      //   if (!group.users.includes(users)) {
      //     group.users.push(users)
      //   }
      // } else {
      //   // Nếu không tìm thấy group, có thể xử lý lỗi hoặc thêm group mới
      //   console.error('Group not found')
      // }
    },
    updateGroupChat: (state, action) => {},
    removeMemberFromGroup: (state, action) => {
      const { groupId, memberId } = action.payload
      console.log(groupId)
      console.log('idMember', memberId)
      // Tìm group tương ứng với idConversation
      const group = state.lsGroupChats.find((group) => group._id === groupId)
      if (group) {
        // Loại bỏ idUser khỏi danh sách members của group nếu có
        group.users = group.users.filter((userId) => userId._id !== memberId)
      } else {
        // Nếu không tìm thấy group, có thể xử lý lỗi hoặc thêm group mới
        console.error('Group not found')
      }
    },
    addMemberToGroup: (state, action) => {},
    setLatestConversation: (state, action) => {},
    deleteMemberInGroup: (state, action) => {},
    setLsPersonalChats: (state, action) => {
      return {
        ...state,
        lsPersonalChats: action.payload,
      }
    },
    setToastMessage: (state, action) => {
      state.toastMessage = action.payload
    },
    clearToastMessage: (state) => {
      state.toastMessage = null
    },
    alertFriendRequest: (state, action) => {},
    setReadNotification: (state, action) => {},
    sendReplyFriendRequest: (state, action) => {},
    setFriendRequestNotification: (state, action) => {
      state.friendRequestNotification = action.payload
    },
    setNewFriendRequestNotification: (state, action) => {
      // return {
      //   ...state,
      //   friendRequestNotification: [...state.friendRequestNotification, action.payload],
      // }
      if (!Array.isArray(state.friendRequestNotification)) {
        state.friendRequestNotification = []
      }
      state.friendRequestNotification.push(action.payload)
    },
    setConversation: (state, action) => {
      console.log(action.payload, state.lsConversation)
      return {
        ...state,
        conversation: state.lsConversation.find(
          (item) => item._id == action.payload.idConversation,
        ),
      }
    },
    setConversationFirst: (state, action) => {
      console.log(action.payload)
    },
    clearUserSlice: () => initialState,
    loginSlice: (state, action) => {},
    logoutSlice: (state, action) => {},
    handleChangeBackground: (state, action) => {},
    setChangeBackground: (state, action) => {
      let conversation = JSON.parse(JSON.stringify(state.lsConversation)).find(
        (item) => item._id == action.payload._id,
      )

      const conversItem = {
        background: action.payload.background,
        avatar: conversation.avatar,
        deleteBy: conversation.deleteBy,
        blockUsers: conversation.blockUsers,
        _id: conversation._id,
        chatName: conversation.chatName,
        isGroupChat: conversation.isGroupChat,
        users: conversation.users,
        createdAt: conversation.createdAt,
        updatedAt: conversation.updatedAt,
        __v: conversation.__v,
        latestMessage: conversation.latestMessage,
      }

      if (conversation) {
        conversation = conversItem
      }
      return {
        ...state,
        conversation: conversation,
      }
    },
    getFriendsAndConversation: () => {},
  },
})

export const {
  setUser,
  clearSearchFriends,
  setUserInfo,
  searchFriends,
  updateUser,
  setNewLsFriends,
  setIdConversation,
  getFriendsAndConversation,
  getIdConversation,
  setLsConversation,
  updateConversation,
  getLsConversation,
  setLsGroupChat,
  setLsPersonalChats,
  alertFriendRequest,
  sendReplyFriendRequest,
  setFriendRequestNotification,
  setNewFriendRequestNotification,
  setConversation,
  setConversationFirst,
  setToastMessage,
  clearToastMessage,
  setFriendRequestReply,
  setFriends,
  getFriends,
  clearUserSlice,
  loginSlice,
  logoutSlice,
  createGroupChat,
  updateGroupChat,
  addMemberToGroup,
  addNewMemberToGroup,
  deleteMemberInGroup,
  removeMemberFromGroup,
  deleteMemberFromGroupInStore,
  updateGroupMembers,
  deleteGroupChat,
  deleteGroupById,
  setNewLsConversation,
  updateConversationByGroupId,
  handleChangeBackground,
  setChangeBackground,
} = userSlice.actions
export default userSlice.reducer
