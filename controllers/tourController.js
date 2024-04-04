import { readFileSync, writeFile } from 'fs';
import { join, resolve } from 'path';

const rootDir = resolve();
const toursPath = join(rootDir, 'dev-data', 'data', 'tours-simple.json');

const tours = JSON.parse(readFileSync(toursPath));

export function checkID(req, res, next, val) {
  if (!tours.find((tour) => req.params.id * 1 === tour.id)) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
}

export function checkBody(req, res, next) {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
}

export function getAllTours(req, res) {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
}

export function getTour(req, res) {
  const id = req.params.id * 1;

  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
}

export function createTour(req, res) {
  const id = tours[tours.length - 1].id + 1;
  const newTour = { ...req.body, id };

  tours.push(newTour);

  writeFile(toursPath, JSON.stringify(tours), () => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  });
}

export function updateTour(req, res) {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
}

export function deleteTour(req, res) {
  res.status(204).json({
    status: 'success',
    data: null,
  });
}
