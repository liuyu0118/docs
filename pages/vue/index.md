## 封装 protable
> vue3 tsx antd
types.ts
```ts
import { InputProps, SelectProps, TableColumnType } from "ant-design-vue";
import { ButtonProps } from "ant-design-vue/es/button";
import { tableProps } from "ant-design-vue/lib/table/Table";
import { CSSProperties, PropType, Ref, VNode } from "vue";

type RequestCallback = {
  data?: {
    records: any[];
    total: number;
  };
};

export type ProTableRequest = (params: {
  current: number;
  size: number;
}) => Promise<RequestCallback> | RequestCallback;

export type UseFormButton = Pick<
  ButtonProps,
  "danger" | "ghost" | "type" | "loading"
> & {
  onClick?: (data: any) => Promise<void> | void | any;
  text: string;
  hidden?: Ref<boolean> | boolean | ((params: any) => boolean);
  size?: "large" | "middle" | "small";
};
export type ProTableColumn = {
  hidden?: {
    type: Boolean;
    default: false;
  };
  buttons?: (UseFormButton & {
    popconfirm?: string;
    permit?: string | string[];
    hidden?: (data: any) => boolean;
  })[];
  query?: boolean | ((params: QueryParams) => VNode);
  queryProps?: (InputProps | SelectProps) & { style?: CSSProperties };
} & TableColumnType;
export type ProTableColumns = ProTableColumn[];
export function proTableProps() {
  return {
    ...tableProps(),
    columns: Array as PropType<ProTableColumns>,
    request: Function as PropType<ProTableRequest>,
    loading: {
      type: Boolean,
      default: true,
    },
  };
}
export type QueryParams = Record<string, any>;
```

index.tsx

```tsx
import {
  VNode,
  computed,
  defineComponent,
  reactive,
  ref,
  shallowReactive,
} from "vue";
import {
  Button,
  Input,
  InputProps,
  Popconfirm,
  Table,
  Tooltip,
  type TablePaginationConfig,
} from "ant-design-vue";
import { ProTableColumns, proTableProps, QueryParams } from "./types";
import { useToggle, useWindowSize } from "@vueuse/core";
import { isEmpty, isFunction, isNumber, isString } from "lodash-es";
import { px } from "@/utils";
import { Icon } from "@/components";

export default defineComponent({
  props: proTableProps(),
  setup(props, { slots }) {
    const tableRef = ref();
    const dataSource = ref<any>([]);
    const columns = ref<ProTableColumns>();
    columns.value = props.columns;
    const pagination: any = shallowReactive(
      Object.assign(
        {
          current: 1,
          pageSize: 20,
          total: 0,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total: number) => (
            <span class="text-black/50">共 {total} 条数据</span>
          ),
        },
        props.pagination || {}
      )
    );

    const { request } = props;
    const [loading, setLoading] = useToggle(props.loading);
    //初始化  刷新
    const refresh = async (pageNum?: number) => {
      if (!request) {
        setLoading(false);
        return;
      }
      if (pageNum) pagination.current = pageNum;
      setLoading(true);

      const params = {
        ...queryParams,
        current: pagination.current,
        size: pagination.pageSize,
      };
      const { data } = await request(params);
      dataSource.value = data?.records;
      pagination.total = data?.total;
      setLoading(false);
    };

    const onChange = (cfg: TablePaginationConfig) => {
      pagination.current = cfg.current;
      pagination.pageSize = cfg.pageSize;
      refresh();
    };
    //列表查询条件属性
    const queryParams = reactive<QueryParams>({});
    //列表查询条件节点
    let queryNodes: (() => VNode)[] = [];
    //实现列表
    const columnsInit = () => {
      queryNodes = [];
      props.columns?.forEach((column, index) => {
        const {
          buttons,
          query,
          title,
          dataIndex,
          queryProps = {},
          width,
        } = column;
        if (!isEmpty(buttons)) {
          column.align = "center";
          column.customRender = (row) => {
            return (
              <div class="flex justify-around">
                {buttons?.map((item) => {
                  const btns: any[] = [];
                  const createClick = (e: Event) => {
                    const click: any = item.onClick;
                    click && click(row, e);
                  };
                  const button = (
                    <Button onClick={createClick} type="link" size="small">
                      <span class={item.danger ? "text-red-500" : ""}>
                        {item.text}
                      </span>
                    </Button>
                  );
                  if (item.popconfirm) {
                    delete button.props?.onClick;
                    btns.push(
                      <Popconfirm
                        title={item.popconfirm}
                        onConfirm={createClick}
                        placement="bottomRight"
                      >
                        {button}
                      </Popconfirm>
                    );
                  } else {
                    btns.push(button);
                  }
                  return btns;
                })}
              </div>
            );
          };
        }
        //没有查询条件就不渲染
        if (!query) return;
        const key = (dataIndex || index) as string;
        const tle = isString(title) ? title : "";
        const props = {
          style: {
            width: px((isNumber(width) ? width + 50 : width) || 120),
          },
          placeholder: tle,
          allowClear: true,
          ...queryProps,
        };
        const tooltipRender = (child: VNode, isCustomRender = false) => {
          return (
            <Tooltip
              title={tle}
              placement="topLeft"
              overlayStyle={{
                fontSize: "12px",
              }}
              align={{ offset: [0, 10] }}
            >
              <child
                {...(isCustomRender
                  ? props.placeholder
                    ? { placeholder: props.placeholder }
                    : {}
                  : props)}
              />
            </Tooltip>
          );
        };
        let element;
        if (isFunction(query)) {
          element = () => {
            const component = query(queryParams);
            return tooltipRender(component, true);
          };
        } else {
          element = () => {
            if (!queryProps.style?.width)
              props.style.width = px(tle.length * 20 + 130);
            return (
              <Input
                v-model:value={queryParams[key]}
                {...(props as InputProps)}
              >
                {{
                  prefix: () =>
                    queryParams[key] && (
                      <span class="text-black/50">{tle}</span>
                    ),
                }}
              </Input>
            );
          };
        }
        queryNodes.push(element);
      });
    };
    refresh();
    columnsInit();
    const querySearch = () => {
      refresh(1);
    };
    const queryReset = () => {
      for (const key in queryParams) delete queryParams[key];
      refresh(1);
    };
    const innerSlots: any = {
      ...slots,
    };
    const { title: defaultTitleSlot, query: querySlot } = innerSlots;
    if (!isEmpty(queryNodes)) {
      innerSlots.title = () => [
        <div class="flex flex-nowrap">
          <div>
            {queryNodes.map((item) => (
              <span class="inline-block mr-2 my-[2px]">{item()}</span>
            ))}
          </div>
          <div class="flex-none pt-[2px] pr-[2px] space-x-2">
            <Button onClick={querySearch}>查询</Button>
            <Tooltip title="重置">
              <Button
                onClick={queryReset}
                class="group"
                icon={
                  <Icon
                    name="RedoOutlined"
                    class="!transition-all !duration-700 group-hover:rotate-180"
                  />
                }
              ></Button>
            </Tooltip>
            {querySlot && querySlot()}
          </div>
        </div>,
        defaultTitleSlot && (
          <div class="pt-[6px] pb-[2px] clear-both overflow-auto">
            {defaultTitleSlot()}
          </div>
        ),
      ];
    }
    return () => (
      <div ref={tableRef}>
        <Table
          {...props}
          pagination={props.pagination === false ? false : pagination}
          columns={columns.value}
          dataSource={dataSource.value}
          loading={loading.value}
          onChange={onChange}
          scroll={{ y: 300 }}
        >
          {innerSlots}
        </Table>
      </div>
    );
  },
});
```

## 封装 useForm 
> vue3 tsx antd

types.ts
```ts
import { ButtonProps, FormItemProps } from 'ant-design-vue'
import { VNode } from 'vue'
export type UseFormConfig = {
    title: string
    width: number
    col: number
    onPullData?: (params: UseFormOpenParams) => Promise<any> | any
    onSubmit?: (
        model: Record<string, any>,
        params: UseFormOpenParams
    ) => Promise<boolean> | boolean
    items: UseFormItem[]
    buttons?: UseFormButton[]
    saveButtonHidden?: boolean
    cancelButtonHidden?: boolean
    saveButtonText?: string
    /**
     * 只在form.render时生效
     */
    buttonAlign?: 'left' | 'right' | 'center'
}
export type UseFormButton = ButtonProps & {
    onClick?: (data?: any) => Promise<void> | void | any
    text: string
}
export type UseFormItem = FormItemProps & {
    colSpan?: number
    render?: () => VNode
}
export type UseFormOpenParams = {
    title?: string
    isEdit?: boolean
    data?: any
}

```
index.tsx

```tsx
iimport {
    render as vueRender,
        createVNode,
        ref,
        defineAsyncComponent,
        defineComponent,
        reactive,
        onMounted
} from 'vue'
import { Modal, ConfigProvider, Button } from 'ant-design-vue'
import { UseFormButton, UseFormConfig, UseFormOpenParams } from './types'
import zhCN from 'ant-design-vue/lib/locale/zh_CN'
import { cloneDeep, isEmpty, isFunction } from 'lodash-es'
const AsyncForm = defineAsyncComponent(() => import('./form'))
export function useForm(cfg: UseFormConfig) {
    const visible = ref(false)
    const modalTitle = ref()
    const model = ref<Record<string, any>>({})
    const formRef = ref(null)
    let buttons: UseFormButton[] = []
    let openParams: UseFormOpenParams
    if (cfg.buttons) {
        buttons = cfg.buttons
    }

    const getFormRef = () => {
        const { form } = formRef.value as any
        if (!form) throw '未定义表单'
        return form
    }
    const submit = async () => {
        const needValidateFields: any = []
        cfg.items.forEach(item => {
            if (item.hidden !== true) needValidateFields.push(item.name)
        })
        try {
            await getFormRef().validate(needValidateFields)
            if (!isFunction(cfg.onSubmit)) return
            const data = cloneDeep(model.value)
            visible.value = !(await cfg.onSubmit(data, openParams))
        } catch (err) {
            visible.value = true
        }
    }
    if (!cfg.saveButtonHidden) {
        buttons.push({
            text: cfg.saveButtonText || '保存',
            type: 'primary',
            async onClick() {
                await submit()
            }
        })
    }
    if (!cfg.cancelButtonHidden) {
        buttons.push({
            text: '取消',
            onClick: () => (visible.value = false)
        })
    }
    const buttonsRef = reactive(
        buttons.map((item, index) => {
            if (item.onClick) {
                const { onClick } = item
                item.onClick = async () => {
                    buttonsRef[index].loading = true
                    await onClick()
                    buttonsRef[index].loading = false
                }
            }
            return item
        })
    )

    const render = defineComponent({
        props: {
            inModal: Boolean
        },
        setup(props) {
            onMounted(async () => {
                if (!props.inModal) await onPullData()
            })
            return () => (
                <>
                    <AsyncForm
                        ref={formRef}
                        model={model.value}
                        items={cfg.items}
                        col={cfg.col}
                    ></AsyncForm>
                    {!props.inModal && (
                        <div
                            style={{
                                textAlign: cfg.buttonAlign || 'center'
                            }}
                        >
                            {renderButtons()}
                        </div>
                    )}
                </>
            )
        }
    })

    const modalButtons = () =>
        buttonsRef.map(item => <Button {...item}>{item.text}</Button>)
    const renderButtons = () =>
        buttonsRef.map(item => {
            if (item.text !== '取消') {
                return (
                    <Button class="mx-2" {...item}>
                        {item.text}
                    </Button>
                )
            }
        })
    const renderModal = createVNode(() => (
        <ConfigProvider componentSize="middle" locale={zhCN}>
            <Modal
                footer={isEmpty(buttons) ? null : modalButtons()}
                title={modalTitle.value}
                width={cfg.width}
                v-model:visible={visible.value}
            >
                {{
                    default: () => <render inModal={true} />
                }}
            </Modal>
        </ConfigProvider>
    ))
    let created = false
    const mountDOM = () => {
        if (!created) {
            const el = document.createDocumentFragment()
            vueRender(renderModal, el as any)
        }
        created = true
    }
    const open = async (params: UseFormOpenParams) => {
        openParams = params
        mountDOM()
        visible.value = true
        modalTitle.value = params.title || cfg.title
        await onPullData()
    }
    const onPullData = async () => {
        if (!isFunction(cfg.onPullData)) return
        model.value = await cfg.onPullData(openParams)
    }
    return {
        open,
        model,
        render
    }
}

```
form.tsx
```tsx
iimport { defineComponent, PropType, ref } from 'vue'
import { Form } from 'ant-design-vue'
import { UseFormItem } from '@marketingcharge/views/useForm/types'
import FormItem from './formItem'
export default defineComponent({
    props: {
        items: {
            type: Object as PropType<UseFormItem[]>,
            required: true
        },
        col: {
            type: Number,
            required: true
        },
        model: {
            type: Object as PropType<Record<string, any>>,
            required: true
        }
    },
    setup(props, { expose }) {
        const items = props.items
        const form = ref(null)
        expose({ form })
        return () => (
            <Form ref={form} model={props.model}>
                <div
                    class="grid gap-x-4"
                    style={{
                        gridTemplateColumns: `repeat(${props.col},minmax(0,1fr))`
                    }}
                >
                    {items.map(item => (
                        <FormItem
                            item={item}
                            model={props.model}
                            col={props.col}
                        ></FormItem>
                    ))}
                </div>
            </Form>
        )
    }
})

```
formItem.tsx
```tsx
import { defineComponent, PropType } from 'vue'
import { UseFormItem } from '@marketingcharge/views/useForm/types'
import { FormItem, Input } from 'ant-design-vue'
import { get, isEmpty, set } from 'lodash-es'

export default defineComponent({
    props: {
        item: {
            type: Object as PropType<UseFormItem>,
            required: true
        },
        col: {
            type: Number,
            required: true
        },
        model: {
            type: Object as PropType<Record<string, any>>,
            required: true
        }
    },
    setup(props) {
        const item = props.item
        const itemName = props.item.name as string
        let n: number
        if (props.col > 1 && item.colSpan) {
            n = props.col > item.colSpan ? item.colSpan : props.col
        }
        let Render: any
        if (item.render) {
            Render = item.render
        } else {
            Render = Input
        }

        const itemProps = {
            ...item,
            render: null
        }
        if (isEmpty(itemProps.rules)) {
            const rules: any = {}
            if (itemProps.required) {
                rules.required = true
                rules.message = `${item.label}不能为空`
            }
            if (!isEmpty(rules)) {
                itemProps.rules = rules
            }
        }

        return () => {
            let Children
            if (item.render) {
                Children = Render()
            } else {
                Children = (
                    <Render
                        value={get(props.model, itemName)}
                        onUpdate:value={(v: string) => set(props.model, itemName, v)}
                    ></Render>
                )
            }
            return (
                <FormItem {...itemProps} style={{ gridColumn: `span ${n}` }}>
                    <Children />
                </FormItem>
            )
        }
    }
})
```
示例
```tsx
import { Select, SelectOption } from 'ant-design-vue'

import { useForm } from './index'
export const form = useForm({
  title: '测试标题',
  width: 1000,
  col: 2,
  onPullData: params => {
    return { a: '', b: 2, c: 3, d: 4 }
  },
  onSubmit: async (model, params) => {
    return true
  },
  items: [
    {
      label: '测试1',
      name: 'a',
      colSpan: 2,
      required: true
    },
    {
      label: '测试2',
      name: 'b',
      render: () => {
        const { value } = form.model
        return (
          <Select v-model:value={value.b}>
            <SelectOption value={1}>123</SelectOption>
            <SelectOption value={2}>456</SelectOption>
          </Select>
        )
      },
      rules: {
        required: true,
        validator: () => {
          if (form.model.value.b) {
            return Promise.resolve()
          }
          return Promise.reject('测试2不能为空')
        }
      }
    },
    {
      label: '测试3',
      name: 'c',
      required: true
    },
    {
      label: '测试4',
      name: 'd'
    }
  ]
})
```
