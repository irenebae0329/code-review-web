import { DatePicker, Select,Form } from "antd";
import { z } from "zod";

const filterFormSchema = z.object({
    dateRange: z.array(z.date()),
    projectId: z.string(),
  });
export function FilterFrom( {}: {onSubmit: (values: z.infer<typeof filterFormSchema>) => void}) {
  
  const filterForm = Form.useFormInstance<z.infer<typeof filterFormSchema>>();
  const [form] = Form.useForm();

  
  return (
     <Form form={form} >
        <Form.Item name="dateRange" label="时间范围">
            <DatePicker.RangePicker value={filterForm.getFieldValue("dateRange")} onChange={(value) => filterForm.setFieldValue("dateRange", value)} />
        </Form.Item>
        <Form.Item name="branch" label="分支">
            <Select>
                
            </Select>
        </Form.Item>
     </Form>
  );
}