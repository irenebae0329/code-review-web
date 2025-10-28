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
  buttonDanger:css`
    border-color: ${token.colorBorder} !important; 
    color: ${token.colorError} !important;
  `,
  buttonSafe:css`
  border-color: ${token.colorBorder} !important;
    color: ${token.colorSuccess} !important;
  `,
  
}));

export default useCodeReviewResultListStyles;