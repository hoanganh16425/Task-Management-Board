import { Flex, Spin } from "antd";

export default function LoadingSpinner() {
  return (
    <Flex
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "400px",
      }}
      gap="middle"
      vertical
    >
      <Spin />
      <div style={{ marginTop: 8 }}>Loading tasks...</div>
    </Flex>
  );
}
