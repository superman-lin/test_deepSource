/**
 * 用于验证 DeepSource Prettier 自动修复的测试文件
 * 故意包含以下格式问题，提交后 DeepSource 应自动修复：
 * - 缩进/空格不一致
 * - 缺少分号
 * - 对象/数组格式混乱
 * - 行过长
 */

const   foo   =   "bar"
const obj={a:1,b:2,c:3}
const arr=[1,2,3,4,5]
function   test(  a,b,c   ){return a+b+c}
const longLine = "这是一行非常长的字符串用于测试 Prettier 是否会自动换行，当超过默认的 80 字符限制时应该被格式化"
export default { foo, obj, arr, test, longLine }
