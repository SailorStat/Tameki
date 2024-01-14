import React from "react";
import localization from "@localization";
import { ChevronRight, ExpandMore } from "@mui/icons-material";
import { Box, styled, SvgIconProps, Typography } from "@mui/material";
import { TreeItem, treeItemClasses, TreeItemProps, TreeView } from "@mui/x-tree-view";
import LayoutWithMenuTitle from "@src/layouts/LayoutWithMenuTitle";

interface RenderTree {
  children?: readonly RenderTree[];
  description: string;
  id: string;
  name: string;
}

const DATA: RenderTree = {
  children: [
    { description: "о маркетплейсе", id: "/about", name: "/about" },
    {
      children: [
        {
          children: [
            { description: "страница о продавце", id: "/aboutShop", name: "/about" },
            { description: "страница для заказа", id: "/shippingList", name: "/shippingList" },
            { description: "заказы", id: "/orders", name: "/orders" },
          ],
          description: "страница товаров продавца",
          id: "/tameki",
          name: "/tameki",
        },
      ],
      description: "выбор продавцов, тоже, что /",
      id: "/shops",
      name: "/shops",
    },
  ],
  description: "самое начало, выбор продавцов",
  id: "/",
  name: "/",
};

declare module "react" {
  interface CSSProperties {
    "--tree-view-bg-color"?: string;
    "--tree-view-color"?: string;
  }
}

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  expandIn: number;
  labelIcon?: React.ElementType<SvgIconProps>;
  labelInfo?: string;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const StyledTreeItemRoot = styled(TreeItem)<StyledTreeItemProps>(({ theme, expandIn }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    "&.Mui-expanded": {
      fontWeight: theme.typography.fontWeightRegular,
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: "var(--tree-view-color)",
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    borderBottomRightRadius: theme.spacing(2),
    borderTopRightRadius: theme.spacing(2),
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    paddingRight: theme.spacing(1),
    [`& .${treeItemClasses.label}`]: {
      color: "inherit",
      fontWeight: "inherit",
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(expandIn * 2 + 2),
    },
  },
})) as unknown as typeof TreeItem;

const StyledTreeItem = React.forwardRef(function StyledTreeItem(
  props: StyledTreeItemProps,
  ref: React.Ref<HTMLLIElement>
) {
  const { bgColor, color, labelIcon: LabelIcon, labelInfo, label, ...other } = props;
  const styleProps = { "--tree-view-bg-color": bgColor, "--tree-view-color": color };

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ alignItems: "center", display: "flex", p: 0.5, pr: 0 }}>
          <Box color="inherit" component={LabelIcon} sx={{ mr: 1 }} />
          <Typography sx={{ flexGrow: 1, fontWeight: "inherit" }} variant="body2">
            {label}
          </Typography>
          <Typography color="inherit" variant="caption">
            {labelInfo}
          </Typography>
        </Box>
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore-next-line
      style={styleProps}
      {...other}
      ref={ref}
    />
  );
});

const SiteTree = () => {
  const renderTree = (nodes: RenderTree, expandIn: number) => (
    <StyledTreeItem
      expandIn={expandIn}
      key={nodes.id}
      label={nodes.name}
      labelInfo={nodes.description}
      nodeId={nodes.id}
    >
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node, expandIn + 1)) : null}
    </StyledTreeItem>
  );

  return (
    <LayoutWithMenuTitle title={localization.siteTree}>
      <TreeView
        defaultCollapseIcon={<ExpandMore />}
        defaultExpanded={[...JSON.stringify(DATA).matchAll(/"id":"\/[a-z]*"/g)].reduce<string[]>(
          (acc, el) => [...acc, ...el[0].match(/\/[a-z]*/g)!],
          []
        )}
        defaultExpandIcon={<ChevronRight />}
      >
        {renderTree(DATA, 0)}
      </TreeView>
    </LayoutWithMenuTitle>
  );
};

export default SiteTree;
