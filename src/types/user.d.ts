// 联合类型
export type User =
  | {
      id: number | string
      token: string
      account: string
      mobile: number | string
      avatar: string
    }
  | undefined

// 匹配出非token字段的类型
type OmitUser = Omit<User, 'token'>

type Info = {
  likeNumber: number
  collectionNumber: number
  score: number
  couponNumber: number
  orderInfo: {
    paidNumber: number
    receivedNumber: number
    shippedNumber: number
    finishedNumber: number
  }
}
// 交叉类型
export type UserInfo = Info & UserInfo
