import classes from "./SearchBar.module.css";

const SearchBar = (props) => {
  return (
    <input
      type="text"
      className={classes.searchbar}
      placeholder="Search Title.."
      name="search"
      onChange={props.onChange}
    />
  );
};

export default SearchBar;
