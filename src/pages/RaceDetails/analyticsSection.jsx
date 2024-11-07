import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { IconField } from "primereact/iconfield";
import { InputText } from "primereact/inputtext";
import { InputIcon } from "primereact/inputicon";
import ChartSection from "./chartSection";

const AnalyticsSection = ({ raceDetails, defaultComparisonDrivers }) => {
  const [team, setTeam] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [rowClick, setRowClick] = useState(true);

  const [globalFilter, setGlobalFilter] = useState(null);

  const [comparisonField, setComparisonField] = useState();
  const [comparison, setComparison] = useState(defaultComparisonDrivers);

  const options = [
    { name: "Points", code: "points" },
    { name: "Laps", code: "laps" },
  ];

  useEffect(() => {
    const result = raceDetails.map((driver) => ({
      id: driver.Driver.driverId,
      name: `${driver.Driver.givenName}  ${driver.Driver.familyName}`,
      position: driver.position,
      nationality: driver.Constructor.nationality,
      time: driver.Time?.millis || "",
      points: driver.points,
      laps: driver.laps,
    }));
    setTeam(result);
  }, [raceDetails]);

  const compareBetweenDrivers = (e) => {
    setComparisonField(e.value);
  };

  const handelCompare = () => {
    const xAxis = [];
    const yAxis = [];
    for (let index = 0; index < selectedTeam.length; index++) {
      const element = selectedTeam[index];
      xAxis.push(element.name);
      yAxis.push(Number(element[comparisonField.code]));
    }
    let list = {
      xAxis,
      yAxis,
      title: `Compare between drivers in ${comparisonField.name}`,
    };
    setComparison(list);
  };

  const resetComparing = () => {
    setSelectedTeam([]);
    setComparisonField();
    setComparison(defaultComparisonDrivers);
  };

  const renderHeader = () => {
    return (
      <div className="flex gap-2 items-center justify-between">
        <div className="flex justify-between items-center ml-auto">
          <IconField iconPosition="left">
            <InputIcon className="pi pi-search" />
            <InputText
              type="search "
              onInput={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search by Name..."
            />
          </IconField>
        </div>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="bg-[#F9FAFB] p-4 rounded w-full flex sm:flex-col lg:flex-row items-center gap-2 border">
        <p>Compare Between Drivers in</p>
        <Dropdown
          value={comparisonField}
          onChange={(e) => compareBetweenDrivers(e)}
          options={options}
          optionLabel="name"
          placeholder="Select a Comparison"
          className=""
          disabled={!selectedTeam || selectedTeam.length < 2}
        />
        <Button
          onClick={handelCompare}
          className="ml-auto"
          label="Compare"
          rounded
        />
        <Button
          onClick={resetComparing}
          label="Reset"
          severity="danger"
          rounded
        />
      </div>
      <div className="flex sm:flex-col sm:gap-4 lg:flex-row lg:gap-0  justify-between items-center  ">
        <div className="sm:w-full lg:w-[48%] border rounded ">
          <DataTable
            header={header}
            value={team}
            paginator
            rows={5}
            globalFilter={globalFilter}
            selectionMode={rowClick ? null : "checkbox"}
            selection={selectedTeam}
            onSelectionChange={(e) => setSelectedTeam(e.value)}
            dataKey="id"
            // tableStyle={{ minWidth: "50rem" }}
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "0.25rem" }}
            ></Column>
            <Column
              field="position"
              header="Position"
              headerStyle={{ width: "1rem" }}
            ></Column>
            <Column field="name" header="Name"></Column>
            <Column field="nationality" header="Nationality"></Column>
            {/* <Column field="team" header="Team"></Column> */}
          </DataTable>
        </div>
        <div className="sm:w-full lg:w-[48%]">
          <ChartSection comparisonDrivers={comparison} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;
