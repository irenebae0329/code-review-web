import { createStyles } from 'antd-style';

const useProjectCardStyles = createStyles(({ css, token }) => ({
  card: css`
    height: 200px;
  `,

  headerLeft: css`
    max-width: 60%;
  `,

  ellipsis: css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,

  tagSpacing: css`
    margin-right: ${token.marginXS}px;
  `,

  icon: css`
    font-size: 18px;
    color: ${token.colorTextSecondary};
  `,

  content: css`
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,

  description: css`
    margin-bottom: 0;
    flex: 1;
    max-height: 60%;
    overflow: auto;
  `,
}));

export default useProjectCardStyles;


