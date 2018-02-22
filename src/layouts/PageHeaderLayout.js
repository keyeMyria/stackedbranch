import React from "react";
import { Link } from "dva/router";
import PageHeader from "../components/Common/PageHeader";
import styles from "./PageHeaderLayout.less";

export default ({ children, wrapperClassName, top, ...restProps }) => (
	<div className={styles.PageHeaderLayoutWrapper}>
		{top}
		<PageHeader {...restProps} linkElement={Link} />
		{children ? <div className={styles.content}>{children}</div> : null}
	</div>
);
