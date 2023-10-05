import Cookies from "js-cookie";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ENDPOINT, TOKEN } from "../../constants";
import { AuthContext } from "../../contexts/AuthContext";
import { Button, Form, Input, Spin, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  getUser,
  saveUser,
  uploadUserPhoto,
} from "../../redux/actions/accountActions";

import "../../sass/AccauntPage.scss";

const AccountPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setIsAuthenticated } = useContext(AuthContext);
  const { uploadLoading, photo, loading } = useSelector(
    (state) => state.account
  );
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getUser(form));
  }, [dispatch, form]);

  const logout = () => {
    setIsAuthenticated(false);
    Cookies.remove(TOKEN);
    navigate("/");
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      className="register"
    >
      <h2>AccountPage </h2>

      <Spin spinning={loading}>
        <Form
          form={form}
          onFinish={() => dispatch(saveUser(form))}
          name="user"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="First name"
            name="first_name"
            rules={[
              {
                required: true,
                message: "Please fill !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last name"
            name="last_name"
            rules={[
              {
                required: true,
                message: "Please fill !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="User name"
            name="username"
            rules={[
              {
                required: true,
                message: "Please fill !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Info"
            name="info"
            rules={[
              {
                required: true,
                message: "Please fill !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone number"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Please fill !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Birthday"
            name="birthday"
            rules={[
              {
                required: true,
                message: "Please fill !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please fill !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please fill !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            onChange={(e) => dispatch(uploadUserPhoto(e))}
          >
            {photo ? (
              <img
                src={`${ENDPOINT}upload/${photo}`}
                alt="avatar"
                style={{
                  width: "100%",
                }}
              />
            ) : (
              <div>
                {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </div>
            )}
          </Upload>
          <Button htmlType="submit" type="primary">
            Save
          </Button>
          <Button
            onClick={logout}
            style={{
              marginBottom: "50px",
            }}
          >
            Logout
          </Button>
        </Form>
      </Spin>
    </div>
  );
};

export default AccountPage;
