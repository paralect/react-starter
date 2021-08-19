/* eslint-disable object-property-newline */
import React, { useState, useEffect } from 'react';
import random from 'lodash/random';
import * as sort from 'lodash/sortBy';

import Table from 'components/table';
import StatusTag from 'components/table/status-tag/status-tag';
import ButtonLink from 'components/button-link';

const columns = [
  {
    width: '17%', key: 'name', title: 'Name',
  },
  {
    width: '17%', key: 'title', title: 'Title',
  },
  {
    width: '17%', key: 'email', title: 'Email',
  },
  {
    width: '17%', key: 'role', title: 'Role',
  },
  {
    width: '16%', key: 'status', title: 'Status',
    render: ({ status }) => <StatusTag status={status} />, // eslint-disable-line react/prop-types
  },
  {
    width: '16%', key: 'action', title: 'Action', noSort: true,
    render: () => <ButtonLink text="Action" icon="action" />,
  },
];

const stubUsers = [
  {
    name: 'Cloe Thornton',
    title: 'Administrator',
    email: 'admin@mail.com',
    role: 'Administrator',
    status: 'positive',
  },
  {
    name: 'Magnus Velasquez',
    title: 'Dev',
    email: 'dev1@mail.com',
    role: 'User',
    status: 'neutral',
  },
  {
    name: 'Finley Rhodes',
    title: 'Dev',
    email: 'dev2@mail.com',
    role: 'User',
    status: 'negative',
  },
];
const data = [...Array(51)].map((_, i) => ({ ...stubUsers[random(2)], id: i }));

const PAGE_SIZE = 5;
const TOTAL_COUNT = data.length;
const TOTAL_PAGES = Math.ceil(TOTAL_COUNT / 5);

export default {
  title: 'Components/Table',
  component: Table,
};

export const Template = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState(null);
  const [items, setItems] = useState(data.slice(0, PAGE_SIZE));
  const [checkedItems, setCheckedItems] = useState([]);

  function handleSortBy(newSortBy) {
    setSortBy(newSortBy);
  }

  function handleGoToPage(selectedPage) {
    setPage(selectedPage);
  }

  useEffect(() => {
    setItems(data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE));
  }, [page]);

  useEffect(() => {
    if (!sortBy) return;

    const ascSortedItems = sort(items, sortBy?.field);
    if (sortBy.direction === 1) {
      setItems(ascSortedItems);
    } else {
      setItems(ascSortedItems.reverse());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, page]);

  return (
    <Table
      items={items}
      columns={columns}
      checkable
      sortBy={sortBy}
      onSortBy={handleSortBy}
      pageSize={PAGE_SIZE}
      page={page}
      totalPages={TOTAL_PAGES}
      itemsCount={items.length}
      totalCount={TOTAL_COUNT}
      checkedItems={checkedItems}
      onCheckItems={setCheckedItems}
      onGoToPage={handleGoToPage}
    />
  );
};
