import { Avatar, Rate, Space, Table, Typography, List, Button, Modal } from "antd";
import { useEffect, useState } from "react";
// import { getInventory, getOrders } from "../../API";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined
} from '@ant-design/icons';
import moment from 'moment';


function Orders() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  // let index = 0;

  useEffect(() => {
    setLoading(true);
    // getOrders().then((res) => {
    //   setDataSource(res.products);
    //   setLoading(false);
    // });
    getAllXuatChieu();
    // console.log(dataSource)
  }, []);

  const getAllXuatChieu = async () => {
    setTimeout(async () => {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:3030/api/v1/xuatChieu',
        headers: {}
      };

      await axios.request(config)
        .then((response) => {
          // console.log(JSON.stringify(response.data));
          setDataSource(response.data.data);
          getMovies();
        })
        .catch((error) => {
          console.log(error);
        });
    }, 500);
  }

  const getMovies = async () => {
    let data = '';

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:3030/api/v1/movies',
      headers: {},
      data: data
    };

    await axios.request(config)
      .then((response) => {
        setMovie(response.data.data);
        setLoading(false);
        // setLoading(false)
        // console.log(response.data.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const deleteHandle = async (record) => {
    await Modal.confirm({
      title: "Có chắc sẽ xóa xuất chiếu này không?",
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk: async () => {
        let config = {
          method: 'delete',
          maxBodyLength: Infinity,
          url: 'http://localhost:3030/api/v1/xuatChieu/' + record._id,
          headers: {}
        };

        await axios.request(config)
          .then((response) => {
            // console.log(JSON.stringify(response.data));
            getAllXuatChieu();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    })
  }

  const columns = [
    // {
    //   title: 'Id',
    //   dataIndex: '_id',
    //   key: '_id',
    //   render: (record) => {
    //     return <>{index++}</>
    //   }
    // },
    {
      title: 'Movie Name',
      dataIndex: 'movieID',
      render: (movieID) => {
        return movie.map(m => {
          if (movieID === m._id) return <>{m.name}</>
        })
      },
      // sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      sorter: {
        compare: (a, b) =>
          moment(a.Date, "DD-MM-YYYY") - moment(b.Date, "DD-MM-YYYY"),
      },
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',

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
    navigate('/xuatchieu-create', {
      state: { movies: movie }
    });
  }

  return (
    <>
      <Typography.Title level={4}>Danh Sách Xuất Chiếu</Typography.Title>
      <List size={20} direction="vertical">
        <Button type="primary"
          style={{
            position: "absolute",
            top: -35,
            right: 50,
            width: 200,
            height: 30,
            fontSize: 18,
            fontWeight: "bold",
            // alignItems: "center",
            // justifyContent: "center"
          }}
          onClick={() => { handleClick() }}
        >
          Thêm Xuất Chiếu
        </Button>

        <Table
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          pagination={{
            pageSize: 8,
          }}
          rowKey={(record) => record._id}
        ></Table>
      </List>
    </>
  );
}
export default Orders;
