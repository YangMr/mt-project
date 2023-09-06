// 获取药品支付页面参数类型
export type MedicineType = {
  /**
   * 使用优惠券，需要传此值，不使用优惠券，不传
   */
  couponId?: string
  /**
   * 处方id
   */
  prescriptionId: string
  /**
   * 不传，默认值1，即使用优惠券
   * 传0，不使用优惠券
   * 其中，不传优惠券id,默认按照最大优惠券使用，
   * 传了优惠券id,表示使用指定的优惠券
   */
  useCoupon?: string
}

export type MedicineResponseType = {
  /**
   * 实际支付
   */
  actualPayment: number
  /**
   * 优惠券抵扣
   */
  couponDeduction: number
  /**
   * 使用的优惠券id
   */
  couponId: string
  /**
   * 运费
   */
  expressFee: number
  /**
   * 处方id
   */
  id: string
  /**
   * 药品信息
   */
  medicines: Medicine[]
  /**
   * 应付金额(药品总价格)
   */
  payment: number
  /**
   * 积分可抵扣
   */
  pointDeduction: number
}

// 药品信息
export type Medicine = {
  /**
   * 药品价格
   */
  amount: string
  /**
   * 药品图片
   */
  avatar: string
  /**
   * 主键id
   */
  id: string
  /**
   * 药品名称
   */
  name: string
  /**
   * 是否是处方药0不是1是
   */
  prescriptionFlag: number
  /**
   * 选择的药品数量
   */
  quantity: number
  /**
   * 药品规格
   */
  specs: string
  /**
   * 药品用法用量
   */
  usageDosag: string
}

// 定义收货地址类型
export type addressResponseType = {
  /**
   * 详细地址
   */
  addressDetail: string
  /**
   * 市区
   */
  city: string
  /**
   * 县
   */
  county: string
  /**
   * 收货地址id
   */
  id: string
  /**
   * 是否为默认，1为是，0为否
   */
  isDefault?: number
  /**
   * 联系方式
   */
  mobile?: string
  /**
   * 省份
   */
  province: string
  /**
   * 收货人姓名
   */
  receiver?: string
}

// 下单的参数类型
export type MedicineOrderType = {
  /**
   * 地址信息
   */
  addressId: string
  /**
   * 使用优惠券信息，不使用优惠券，不用传值
   */
  couponId?: string
  /**
   * 处方id
   */
  id: string
}
