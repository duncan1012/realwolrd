/**
 * 验证是否登陆中间件
 * @param {*} param0 
 * @returns 
 */
export default function ({ store, redirect }) {
  if (!store.state.user) {
    return redirect('/login')
  }
}