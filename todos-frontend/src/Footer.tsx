import classNames from 'classnames';
import { Link } from 'react-router-dom';
import React from 'react';

import { Filter } from './Filter';
import { pluralize } from './pluralize';

interface FooterProps {
  readonly activeCount: number;
  readonly filter: Filter;
}

export function Footer({ activeCount, filter }: FooterProps) {
  return (
    <footer className="p-4 bg-white sm:p-6 dark:bg-gray-900">
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          {activeCount} {pluralize(activeCount, 'item')} left
        </span>
        <div className="inline-flex rounded-md shadow-md">
          <Link
            to="/"
            aria-current="page"
            className={classNames({
              'py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white':
                true,
              'text-blue-700': filter === Filter.All,
            })}
          >
            All
          </Link>
          <Link
            to="/active"
            className={classNames({
              'py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white':
                true,
              'text-blue-700': filter === Filter.Active,
            })}
          >
            Active
          </Link>
          <Link
            to="/completed"
            className={classNames({
              'py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-r-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white':
                true,
              'text-blue-700': filter === Filter.Completed,
            })}
          >
            Completed
          </Link>
        </div>
        <div>&nbsp;</div>
      </div>
    </footer>
  );
}
