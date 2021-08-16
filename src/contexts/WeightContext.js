import React, { useContext } from  "react"
import { db, firebase } from "../firebase";

const WeightContext = React.createContext()

export function useWeight(){
    return useContext(WeightContext)
}

export function WeightProvider({children}){
  // const [weights, setWeights] = useState([]);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function formatData(weights){
    let allWeights = weights.map((item) => {
      let weight = item.weight;
      let t = item.time.toDate();
      let tm = t.toLocaleTimeString()
      let date = t.getDate()
      let month = months[t.getMonth()]
      let year = t.getFullYear()
      let time = `${date}, ${month} ${year} ${tm}`
      let res = {weight, time}
      return res;
    })

    return allWeights;
  }

  async function getData({userId}){
    var res = [];
    await db.collection("weights")
       .doc(userId)
       .collection("weight")
       .orderBy("time", "asc")
       .get()
       .then((snapshot) => {
         let wts = [];
         snapshot.forEach((doc) => wts.push(doc.data()));
         res = formatData(wts)
        //  console.log(res)
        //  setWeights(res);
       })
       .catch((e) => console.error(e));
      //  console.log(res)
       return res;
  }

  async function uploadData({userId, weight}){
    let time = firebase.firestore.Timestamp.fromDate(new Date());
     await db.collection("weights")
       .doc(userId)
       .collection("weight")
       .add({
         weight: weight,
         time: time,
       }).then((r) => {
          let newwt = [
            {
              weight: weight,
              time: time,
            },
          ];
          let res = formatData(newwt);
          return res;
       });
  }

  const value = {
      getData,
      uploadData,
      formatData
  }

  return (
          <WeightContext.Provider  value={value}>
             {children}
          </WeightContext.Provider>
          );
}