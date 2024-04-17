import { Avatar, List, Rate, Space, Table, Typography, Button, Modal } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined
} from '@ant-design/icons';


function Inventory() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();
  // let index = 0;

  useEffect(() => {
    console.log("list call");
    setLoading(true);
    getMovies();
    // index = 0;
  }, []);

  const getMovies = async () => {
    setTimeout(async () => {
      let data = '';

      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:3030/api/v1/movies',
        headers: {}
      };

      await axios.request(config)
        .then((response) => {
          // console.log(response.data.data);
          setDataSource(response.data.data);
          console.log(response.data.data)
          setLoading(false)
        })
        .catch((error) => {
          console.log(error);
        });
    }, 500);
  }
  const columns = [
    // {
    //   title: 'Id',
    //   // dataIndex: '_id',
    //   key: '_id',
    //   render: (index) => {
    //     return <>{index++}</>
    //   }
    // },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      // onFilter: (value, record) => record.name.indexOf(value) === 0,
      // sorter: (a, b) => a.name.length - b.name.length,
      // defaultSortOrder: 'ascend',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      render: (image) => <img alt={"image"} src={image} style={{ width: 100, height: 150 }} />
    },
    {
      title: 'Point',
      dataIndex: 'imdbPoint',
      key: 'imdbPoint',
      sorter: (a, b) => a.imdbPoint - b.imdbPoint,
    },
    // {
    //   title: 'Category',
    //   dataIndex: ['category', 'name'],
    //   key: 'category',
    //   // render: item => console.log(Object.keys(item)),
    // },
    {
      title: 'Action',
      render: (record) => {
        return <>
          <Button style={{
            width: 70,
            height: 40,
            color: "green",
            fontSize: 20,
            marginRight: 10,
            borderColor: "green"
          }}
            onClick={() => {
              navigate('/edit',
                {
                  state: { record: record }
                });
            }}
          >
            <EditOutlined />
          </Button>
          <Button danger
            style={{
              width: 70,
              height: 40,
              fontSize: 20,
            }}
          >
            <DeleteOutlined onClick={() => {
              deleteHandle(record);
            }} />
          </Button>
        </>
      }
    },

  ];

  function handleClick(event) {

    navigate('/create');
  }

  const deleteHandle = async (record) => {
    await Modal.confirm({
      title: "Có chắc sẽ xóa phim này không?",
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk: async () => {
        let config = {
          method: 'delete',
          maxBodyLength: Infinity,
          url: 'http://localhost:3030/api/v1/movies/' + record._id,
          headers: {}
        };

        await axios.request(config)
          .then((response) => {
            console.log("deleted");
            getMovies();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    })
  }

  return (
    <>
      <Typography.Title level={4}>Danh Sách Phim</Typography.Title>
      <List size={20} direction="vertical">
        <Button type="primary"
          style={{
            position: "absolute",
            top: -35,
            right: 50,
            width: 150,
            height: 30,
            fontSize: 18,
            fontWeight: "bold",
            alignItems: "center",
            justifyContent: "center"
          }}
          onClick={() => { handleClick() }}>Thêm Phim</Button>

        <Table
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          pagination={{
            pageSize: 3,
          }}
          rowKey={(record) => record._id}
        ></Table>
      </List>
    </>
  );
}
export default Inventory;
