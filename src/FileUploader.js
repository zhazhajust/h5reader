import React, { useState } from 'react';
import { Upload, Button, List, Typography, Tabs } from 'antd';
import { UploadOutlined, FileOutlined } from '@ant-design/icons';
import Viewer from './Viewer';
import './FileUploader.css'; // 引入CSS文件

const { Text } = Typography;
const { TabPane } = Tabs;

const FileUploader = () => {
  const [fileList, setFileList] = useState([]);
  const [fileInfo, setFileInfo] = useState(null);
  const [activeKey, setActiveKey] = useState("1");

  const handleChange = ({ fileList }) => {
    // 清除旧的文件缓存
    if (fileInfo && fileInfo.uri) {
      URL.revokeObjectURL(fileInfo.uri);
    }

    setFileList(fileList);

    if (fileList.length > 0) {
      const file = fileList[0].originFileObj;
      const fileUri = URL.createObjectURL(file);
      const info = {
        uri: fileUri,
        name: file.name,
        size: file.size,
      };
      setFileInfo(info);
      setActiveKey("2"); // 自动跳转到Viewer页面
    } else {
      setFileInfo(null);
      setActiveKey("1"); // 返回文件管理页面
    }
  };

  return (
    <div className="center-container">
      <Tabs activeKey={activeKey} onChange={setActiveKey}>
        <TabPane tab="文件管理" key="1">
          <div className="upload-container">
            <Upload
              accept=".h5"
              fileList={fileList}
              onChange={handleChange}
              beforeUpload={() => false} // Prevent automatic upload
              listType="text"
            >
              <Button icon={<UploadOutlined />}>上传文件</Button>
            </Upload>
          </div>
          {fileList.length > 0 && (
            <div className="list-container">
              <List
                itemLayout="horizontal"
                dataSource={fileList}
                renderItem={(file) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<FileOutlined />}
                      title={<Text>{file.name}</Text>}
                      description={`大小: ${(file.size / 1024).toFixed(2)} KB`}
                    />
                  </List.Item>
                )}
              />
            </div>
          )}
        </TabPane>
        <TabPane tab="查看器" key="2">
          {fileInfo ? (
            <Viewer fileInfo={fileInfo} />
          ) : (
            <Text>请选择一个文件进行查看</Text>
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default FileUploader;
