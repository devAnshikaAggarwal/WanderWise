import React from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import "../styles/Destinations.css";

const domesticDestinations = [
  { name: "Araku Valley", state: "Andhra Pradesh", country: "India", img: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80" },
  { name: "Tawang", state: "Arunachal Pradesh", country: "India", img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80" },
  { name: "Kaziranga", state: "Assam", country: "India", img: "https://www.kaziranga-national-park.com/wp-content/uploads/2019/05/kaziranga-national-park2.jpg" },
  { name: "Bodh Gaya", state: "Bihar", country: "India", img: "https://www.oyorooms.com/travel-guide/wp-content/uploads/2019/12/shutterstock_402120757-1.webp" },
  { name: "Chitrakote Falls", state: "Chhattisgarh", country: "India", img: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcS4x3RmB8bCWbDt-kqpTOQM4LTW4kb4UJjz92LZROeRTSVmAGLoBkCcIKvXNozcZqF-dZ4LQvPiiMgA8TbugYnFCWs&s=19" },
  { name: "Goa", state: "Goa", country: "India", img: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHH4Zs08wJBx1oDVj1tuC5jjnad0bBXpJ9ZrpPodJfnnpOLl-y_I6TUERya4dhj9SgC255-1XVTMXZSoZ2ELBbxMvLCMsualKYaacU_5DsxxjeUTe4ald99h4GcbHa1X8499KRs4uZgX7w=w675-h390-n-k-no" },
  { name: "Rann of Kutch", state: "Gujarat", country: "India", img: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcR_5JxDJeJXZet5j0O3SN-0pjLAKGwpBdDKalN7Tozk7gLBRMAK0WoY8spb5tY74l7JrrZAS1ntMK7nbWHWOpl7Sxry&s=19" },
  { name: "Sultanpur Lake", state: "Haryana", country: "India", img: "data:image/jpeg;base64,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" },
  { name: "Manali", state: "Himachal Pradesh", country: "India", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80" },
  { name: "Netarhat", state: "Jharkhand", country: "India", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdjJ7rX7YAVXBw9t-00s0ilDw5qmhnUm4JfqhfTreQ-w&s=10" },
  { name: "Coorg", state: "Karnataka", country: "India", img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80" },
  { name: "Alleppey", state: "Kerala", country: "India", img: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80" },
  { name: "Khajuraho", state: "Madhya Pradesh", country: "India", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRicP0ONeZWh6oWg--b2OaWBODQOZGafB7jpuiHq4hb5w&s=10" },
  { name: "Gateway of India", state: "Maharashtra", country: "India", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_-jWXt-HD6lFetcLbF8RPh8aG6iQTLWpWP5DrbgwQaw&s=10" },
  { name: "Loktak Lake", state: "Manipur", country: "India", img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80" },
  { name: "Shillong", state: "Meghalaya", country: "India", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsYP7mEqVY3L8dvEmvitwdsO7D2wMtrEaMloiWtayfnw&s=10" },
  { name: "Aizawl Hills", state: "Mizoram", country: "India", img: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80" },
  { name: "Dzukou Valley", state: "Nagaland", country: "India", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLk9Gs0KX0wt2WNkT3YMpC7VSdy9iutlzQLPelqDG6pg&s=10" },
  { name: "Puri Beach", state: "Odisha", country: "India", img: "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=800&q=80" },
  { name: "Golden Temple", state: "Punjab", country: "India", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnomHTvxNPMikPZuFI_fkj9OY1AuIYsJSTFp9lQuVqgw&s=10" },
  { name: "Udaipur", state: "Rajasthan", country: "India", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtYRvVLKo57Xs8SmMrC0xp7UQctKt5gvLcwMLI1jhlQQ&s=10" },
  { name: "Gangtok", state: "Sikkim", country: "India", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNc4mLIRlKziV_os9o6DVHZc2FdK_32mZx7eX4_dJdkA&s=10" },
  { name: "Mahabalipuram", state: "Tamil Nadu", country: "India", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTER7M8_WWdyPpvqB4yPOtGM3PbVkatr9plU9YpBJGizg&s=10" },
  { name: "Charminar", state: "Telangana", country: "India", img: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHRCDRz0wVJQmGW0foHHRFs9DJuQOJi5nAbOAHQbjpM-yuJF-YKr0bv-uEKcTOZIeg6Kdh5HNIj6Kji4s4F7-SWi7pX7E8AmttcUAkacgJDtctl7huSyxMOGZF0FLGIEtnparLtpA=s1360-w1360-h1020-rw" },
  { name: "Ujjayanta Palace", state: "Tripura", country: "India", img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80" },
  { name: "Varanasi Ghats", state: "Uttar Pradesh", country: "India", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnL8_jN7JSvNMR2zJAC_jBhPaQwu1OEzbZJRfhwJIVIw&s=10" },
  { name: "Nainital", state: "Uttarakhand", country: "India", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzWESHwcwr3pGKbjtU8CNJnqm8OYIpq-EhdcpZnNADdg&s=10" },
  { name: "Darjeeling", state: "West Bengal", country: "India", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-x7FOq6DIG7MRJigiWpR4kwJwyBFFPCLARC-sQDTtxA&s" }
];

const Destinations = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  const filteredDomestic = domesticDestinations.filter((item) =>
    [item.name, item.state, item.country].join(" ").toLowerCase().includes(searchQuery)
  );

  const hasResults = filteredDomestic.length > 0;

  return (
    <div className="dest-page">
      <div className="dest-header">
        <div>
          <h2>Explore India</h2>
          <p>All 28 states featured with famous destinations and scenic images.</p>
          {searchQuery && (
            <p className="search-note">
              Showing results for <strong>“{searchQuery}”</strong>
            </p>
          )}
        </div>
        <SearchBar defaultValue={searchQuery} placeholder="Search states or destinations..." />
      </div>

      <section className="dest-section">
        <div className="section-head">
          <h3>Domestic Destinations</h3>
          <span>{filteredDomestic.length} places</span>
        </div>
        <div className="grid">
          {filteredDomestic.length > 0 ? (
            filteredDomestic.map((item, index) => (
              <div className="card" key={`domestic-${index}`}>
                <img src={item.img} alt={item.name} loading="lazy" />
                <div className="card-copy">
                  <h3>{item.name}</h3>
                  <p>{item.state}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="card empty-card">
              <h3>No matches</h3>
              <p>Try searching for a state or destination name.</p>
            </div>
          )}
        </div>
      </section>

      {!hasResults && searchQuery && (
        <div className="empty-state">
          <p>We couldn’t find any results for that search. Try a broader term like “beach”, “mountain”, or “city”.</p>
        </div>
      )}
    </div>
  );
};

export default Destinations;
