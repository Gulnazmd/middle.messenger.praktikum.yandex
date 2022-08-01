export type Message = {
  id: number,
  userId: number,
  chatId: number,
  type: string,
  time: string,
  content: string,
  isRead: boolean,
  file: string
}
