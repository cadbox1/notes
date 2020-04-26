import React from "react";

export type ToolbarButtonProps = {
	onClick?: (...args: []) => void;
	title?: string;
	children: React.ReactNode;
};

export const ToolbarButton = ({
	onClick,
	title,
	children,
	...props
}: ToolbarButtonProps) => (
	<button
		onClick={onClick}
		title={title}
		style={{ padding: "0.4rem 0.6rem", background: "transparent" }}
		{...props}
	>
		{children}
	</button>
);