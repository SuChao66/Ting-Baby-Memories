// 导入 NutUI 组件
import { Input, Button } from "@nutui/nutui-react";
// 导入状态管理
import { useBabyStore } from "@/store";
// 导入首页样式组件
import { FormContainer, FormItem, FormLabel, DateInput } from "./styles";

export default function Home() {
  const { name, birthday, setName, setBirthday } = useBabyStore();

  return (
    <div>
      <h1>{name}的记忆</h1>
      <p>记录宝宝成长的每一个珍贵瞬间。</p>

      <FormContainer>
        <FormItem>
          <FormLabel>宝宝昵称</FormLabel>
          <Input
            value={name}
            onChange={(val) => setName(val)}
            placeholder="输入宝宝昵称"
          />
        </FormItem>
        <FormItem>
          <FormLabel>出生日期</FormLabel>
          <DateInput
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </FormItem>
        <Button type="primary" block>
          保存
        </Button>
      </FormContainer>
    </div>
  );
}
