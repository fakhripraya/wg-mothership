import { useCallback, useMemo } from "react";
import Accordion from "../../../components/Accordion";
import Checkbox from "../../../components/Checkbox";
import { FILTER_BUTTON_ELEMENT } from "../../../variables/constants/productSearch";
import { cloneDeep } from "lodash-es";

const handleCheckboxes = (e, props) =>
  props.setStateDatas((oldArr) => {
    const checked = e.target.checked;
    const findIndex = oldArr.findIndex(
      (item) =>
        item.filter === props.filter &&
        item.key === props.data.key
    );
    if (findIndex > -1) oldArr.splice(findIndex, 1);
    else if (checked)
      oldArr.push({
        filter: props.filter,
        key: props.data.key,
        value: props.data.value,
      });
    return cloneDeep(oldArr);
  });

const ShowAccordionsButtons = (props) =>
  useMemo(
    () => (
      <label className={`${props.className} main-color`}>
        {props.data.title}
      </label>
    ),
    [props.data, props.filter]
  );

const ShowAccordionsCheckboxes = (props) =>
  useMemo(
    () => (
      <Checkbox
        onChange={(e) => handleCheckboxes(e, props)}
        className={props.className}
        title={props.data.title}
      />
    ),
    [props.data, props.filter]
  );

const ShowAccordion = (props) =>
  useMemo(
    () => (
      <Accordion
        toggle={props.toggle}
        isButton={props.isButton}
        title={props.title}
        data={props.data}>
        {props.data.map((obj, index) => {
          if (obj.type === FILTER_BUTTON_ELEMENT)
            return (
              <ShowAccordionsButtons
                key={`accordion-button-${obj.title}-${index}`}
                className="product-search-accordion-button"
                filter={props.filter}
                data={obj}
                stateData={props.stateData}
                setStateDatas={props.setStateDatas}
              />
            );
          else
            return (
              <ShowAccordionsCheckboxes
                key={`accordion-checkbox-${obj.title}-${index}`}
                className="product-search-accordion-button"
                filter={props.filter}
                data={obj}
                stateData={props.stateData}
                setStateDatas={props.setStateDatas}
              />
            );
        })}
      </Accordion>
    ),
    [props.data]
  );

const ShowAccordions = (props) =>
  useCallback(
    () =>
      props.datas.map((item, index) => (
        <ShowAccordion
          key={`${props.uniqueKey}-accordion-${index}`}
          toggle={true}
          isButton={false}
          title={item.title}
          filter={item.filter}
          data={item.data}
          stateData={props.stateData}
          setStateDatas={props.setStateDatas}
        />
      )),
    [props.datas]
  )();

export default ShowAccordions;
