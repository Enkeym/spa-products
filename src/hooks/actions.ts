import { bindActionCreators } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { productActions } from "../store/product/productSlice"

const actions = {
  ...productActions,
}

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}