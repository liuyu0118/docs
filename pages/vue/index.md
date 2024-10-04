## 封装 protable

vue3 + antd 3

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
