import { createStyles } from "antd-style";

const useCodeReviewResultListStyles = createStyles(({ css, token }) => ({
  avatar: css`
    width: ${token.sizeSM}px;
    height: ${token.sizeSM}px;
  `,
  listItemContent: css`
    gap: ${token.paddingXXS}px;
    min-width: 80%;
  `,
  listItem: css`
    padding-left: ${token.padding}px !important;
  `,
  listItemFlex: css`
    gap: ${token.paddingXXS}px;
    width: 100%;
    align-items: center;
  `,
  buttonDanger: css`
    align-items: center;
    background-color: initial;
    border-radius: 624.9375rem;
    border-style: solid;
    border-width: 0.0625rem;
    border-color: ${token.colorError} !important;
    color: ${token.colorError} !important;
    display: inline-flex;
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1;
    white-space: nowrap;
  `,
  buttonSafe: css`
    align-items: center;
    background-color: initial;
    border-radius: 624.9375rem;
    border-style: solid;
    border-width: 0.0625rem;
    border-color: #1f883d !important;
    color: #1f883d !important;
    display: inline-flex;
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1;
    white-space: nowrap;
  `,
  
}));

export default useCodeReviewResultListStyles;