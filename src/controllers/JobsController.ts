import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError, BadRequestError } from '../errors/index.js';
import { ICustomRequestJobs } from '../types/ICustomRequest.js';
import { Response } from 'express';
import { IJobQueryObject, JobStatusType, JobType, SortType } from '../types/IJob.js';
import mongoose from 'mongoose';
import moment from 'moment';
import IJobStats, {
  IJobAggregateResponse,
  IJobMonthlyApplication,
  IJobMonthlyApplicationResponse,
} from '../types/IJobStats.js';

const getAllJobs = async (req: ICustomRequestJobs, res: Response) => {
  const { search, status, jobType, sort } = req.query;

  const queryObject: IJobQueryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.position = { $regex: search, $options: 'i' };
  }

  if (status && status !== JobStatusType.ALL) {
    queryObject.status = status;
  }

  if (jobType && jobType !== JobType.ALL) {
    queryObject.jobType = jobType;
  }

  let result = Job.find(queryObject);

  // sort
  if (sort === SortType.LATEST) {
    result = result.sort('-createdAt');
  }

  if (sort === SortType.OLDEST) {
    result = result.sort('createdAt');
  }

  if (sort === SortType.A_Z) {
    result = result.sort('position');
  }

  if (sort === SortType.Z_A) {
    result = result.sort('-position');
  }

  // pagination
  const { page = 1, limit = 10 } = req.query;

  const skip = (+page - 1) * +limit;

  result.limit(+limit).skip(skip);

  const jobs = await result;

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / +limit);

  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
};

const getJob = async (req: ICustomRequestJobs, res: Response) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOne({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }

  res.status(StatusCodes.OK).json(job);
};

const createJob = async (req: ICustomRequestJobs, res: Response) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json(job);
};

const updateJob = async (req: ICustomRequestJobs, res: Response) => {
  const {
    user: { userId },
    params: { id: jobId },
    body: { company, position },
  } = req;

  if (company === '' || position === '') {
    throw new BadRequestError('Company or Position fields cannot by empty');
  }

  const job = await Job.findByIdAndUpdate({ _id: jobId, createdBy: userId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req: ICustomRequestJobs, res: Response) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findByIdAndDelete({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }

  res.status(StatusCodes.OK).send();
};

const jobsStats = async (req: ICustomRequestJobs, res: Response) => {
  const stats = await Job.aggregate<IJobAggregateResponse>([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  const defaultStats: IJobStats = stats.reduce(
    (stats, stat) => {
      const { _id, count } = stat;
      stats[_id] = +count;
      return stats;
    },
    { pending: 0, declined: 0, interview: 0 }
  );

  const mApplications = await Job.aggregate<IJobMonthlyApplicationResponse>([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ]);

  const monthlyApplications: IJobMonthlyApplication[] = mApplications.map(
    (application: IJobMonthlyApplicationResponse) => {
      const {
        _id: { year, month },
        count,
      } = application;

      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y');

      return { date, count };
    }
  );

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

export { getAllJobs, getJob, createJob, updateJob, deleteJob, jobsStats };
