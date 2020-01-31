import React, { FunctionComponent } from 'react'
import { GeneralComponent } from '../@types/index'
import GeneralOrderPrice from './utils/GeneralOrderPrice'

export interface ShippingProps extends GeneralComponent {
  format?: 'formatted' | 'cents' | 'float'
  children?: FunctionComponent
}

const Shipping: FunctionComponent<ShippingProps> = props => {
  return <GeneralOrderPrice base="amount" type="shipping" {...props} />
}

export default Shipping